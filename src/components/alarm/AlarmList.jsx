import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//리덕스
import {
  __getAlarmList,
  __postAlarmAccept,
  __deleteAlarmReject,
  __deleteConfirm,
  alarmReadStatus,
} from "../../redux/modules/alarmSlice";

//상수, api
import { IMAGES, PATH } from "../../constants/index";

//컴포넌트
import SubHeader from "../header/SubHeader";
import MainHeader from "../header/MainHeader";
import ButtonS from "../element/ButtonS";
import { carrotAlert } from "../element/alert";

const AlarmList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarmList = useSelector((state) => state.alarm.alarmList);

  //읽음 설정 관련
  const alarmRead = useSelector((state) => state.alarm.alarmRead);

  //그룹 읽음 데이터 확인
  const alarmIsRead = useSelector((state) => state.alarm.isRead);
  //console.log("서버의 읽음 설정", alarmIsRead);
  //console.log("프론트의 읽음 설정", alarmRead);

  //알림 리스트 불러오기
  useEffect(() => {
    //console.log("hi");
    dispatch(__getAlarmList());
    dispatch(alarmReadStatus(true));
  }, [alarmRead]);

  //그룹 초대 승락
  const clickAcceptHandler = (notificationId, groupId) => {
    dispatch(__postAlarmAccept({ notificationId, groupId })).then((res) => {
      if (res?.error?.message === "Rejected") {
        carrotAlert("존재하지 않는 그룹입니다");
        //dispatch(__deleteConfirm(notificationId));
      } else {
        carrotAlert("그룹 초대를 승락했습니다");
      }
    });
  };

  //그룹 초대 거절
  const clickRejectHandler = (notificationId, groupId) => {
    dispatch(__deleteAlarmReject({ notificationId, groupId })).then((res) => {
      if (res?.error?.message === "Rejected") {
        carrotAlert("존재하지 않는 그룹입니다");
        //dispatch(__deleteConfirm(notificationId));
      } else {
        carrotAlert("그룹 초대를 거절했습니다");
      }
    });
  };

  //그룹 초대 결과 확인
  const clickConfirmHandler = (notificationId) => {
    dispatch(__deleteConfirm(notificationId));
  };

  return (
    <>
      <MainHeader title="Notice" leftSlot={IMAGES.home} leftLink={PATH.timer} />
      <SubHeader
        title="알림"
        leftSlot={IMAGES.fold}
        onClick={() => navigate(-1)}
      />
      <StLayout>
        <StListBoxs>
          {alarmList?.length !== 0 && alarmList?.length !== undefined && (
            <>
              {[...alarmList].reverse()?.map((alarm) => (
                <StBox key={alarm?.notificationId}>
                  {alarm?.notificationType === "INVITATION" ? (
                    <p>
                      <strong>{alarm?.content}</strong> 그룹에서 멤버로
                      초대합니다.
                      <br />
                      초대에 응하시겠어요?
                    </p>
                  ) : (
                    <p>{alarm?.content}</p>
                  )}
                  {alarm?.notificationType === "INVITATION" ? (
                    <StButtonSet>
                      <ButtonS
                        className="reverse"
                        onClick={() =>
                          clickRejectHandler(
                            alarm?.notificationId,
                            alarm?.groupId
                          )
                        }
                      >
                        거절
                      </ButtonS>
                      <ButtonS
                        onClick={() =>
                          clickAcceptHandler(
                            alarm?.notificationId,
                            alarm?.groupId
                          )
                        }
                      >
                        수락
                      </ButtonS>
                    </StButtonSet>
                  ) : (
                    <StButtonSet>
                      <ButtonS
                        onClick={() =>
                          clickConfirmHandler(alarm?.notificationId)
                        }
                      >
                        확인
                      </ButtonS>
                    </StButtonSet>
                  )}
                </StBox>
              ))}
            </>
          )}
        </StListBoxs>
      </StLayout>
    </>
  );
};

export default AlarmList;

const StLayout = styled.div`
  padding: 12px 28px;
  height: 100%;
  background: #f9f3ea;
`;

const StListBoxs = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StBox = styled.div`
  background: #fffdfa;
  border: 1px solid #f1e5d2;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  p {
    font-family: "Pretendard-Regular";
    font-weight: 500;
    font-size: 1.4rem;
    color: #595550;
    text-align: center;
    line-height: 160%;
  }
  p > strong {
    font-family: "Pretendard-Bold";
    font-weight: 700;
  }
`;

const StButtonSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;
