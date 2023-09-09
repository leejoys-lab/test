//리액트 관련
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

//리덕스
import {
  detailMenuOpenStatus,
  groupMemberOpenStatus,
} from "../../redux/modules/modalSlice";
import {
  __deleteGroup,
  __getGroupMember,
  __outGroup,
} from "../../redux/modules/groupSlice.js";

//상수, api
import { IMAGES, PATH } from "../../constants/index";

//컴포넌트
import GroupSlideModal from "./GroupSlideModal";
import GroupModal from "./GroupModal";
import GroupDetailBtn from "../element/GroupDetailBtn";
import ProfileImg from "../element/ProfileImg";

const GroupMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupMemberGet = useSelector((state) => state.group.groupMemberGet);

  //const groupId = groupMemberGet?.groupId;
  const groupName = groupMemberGet?.groupName;

  const groupMenuOpen = useSelector((state) => state.modalSlice.groupMenuOpen);

  const groupMemberOpen = useSelector(
    (state) => state.modalSlice.groupMemberOpen
  );

  const param = useParams();
  const groupId = param.groupId;

  const ClickToggle = () => {
    dispatch(groupMemberOpenStatus(!groupMemberOpen));
  };

  //멤버 토글을 열 때마다 데이터 업데이트 //이걸 하면 처음에 멤버를 받음 //렉이 좀 생기는듯함
  useEffect(() => {
    dispatch(__getGroupMember(groupId));
    return () => {
      dispatch(detailMenuOpenStatus(false));
    };
  }, [groupMemberOpen]);

  //그룹 탈퇴, 수정, 삭제 토글 관리
  const detailMenuOpen = useSelector(
    (state) => state.modalSlice.detailMenuOpen
  );
  const [quitModal, setQuitModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  //그룹 탈퇴, 수정, 삭제 버튼 클릭 핸들러
  //그룹 탈퇴
  const clickQuitHandler = () => {
    setQuitModal(true);
    dispatch(detailMenuOpenStatus(!detailMenuOpen));
  };

  //그룹 삭제
  const clickDeleteHandler = () => {
    setDeleteModal(true);
    dispatch(detailMenuOpenStatus(!detailMenuOpen));
  };

  //그룹 수정
  const clickUpdateHandler = () => {
    dispatch(detailMenuOpenStatus(!detailMenuOpen));
    navigate(PATH.groupupdate(groupId));
  };

  //그룹원 초대
  const clickInviteHandler = () => {
    navigate(PATH.groupinvite(groupId));
  };

  //모달에 전달해주는 확인 기능
  //그룹 삭제
  const clickDeleteConfirm = () => {
    dispatch(__deleteGroup(groupId)).then(() => {
      navigate(PATH.grouplist);
    });
  };

  //그룹 탈퇴
  const clickOutConfirm = () => {
    dispatch(__outGroup(groupId)).then(() => {
      navigate(PATH.grouplist);
    });
  };

  //모달에 전달해주는 취소 기능
  const clickDeleteCancle = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {!groupMenuOpen ? (
        <GroupSlideModal
          bottom="-69.7044vh"
          height="80.5419vh"
          toggle={groupMemberOpen}
          cancleHandler={ClickToggle}
        >
          <GroupMemberLayout>
            <Top>
              {groupMemberOpen ? (
                <button aria-label="downArrow" onClick={ClickToggle}>
                  {IMAGES.downArrow}
                </button>
              ) : (
                <button aria-label="upArrow" onClick={ClickToggle}>
                  {IMAGES.upArrow}
                </button>
              )}
              <h1 onClick={ClickToggle}>그룹원 목록</h1>
              <div>{groupMemberGet.onlineParticipant} 접속중</div>
            </Top>
            {groupMemberOpen ? (
              <>
                <ScrollBox>
                  <Member>
                    <State>
                      <div />
                      <span>나</span>
                    </State>
                    {groupMemberGet?.myInfo !== undefined ? (
                      <>
                        <User>
                          <ProfileImg
                            src={groupMemberGet?.myInfo[0]?.profileImage}
                          />
                          <span>{groupMemberGet?.myInfo[0]?.username}</span>
                        </User>
                        <Carrot>
                          {IMAGES.memberCarrot}
                          {groupMemberGet?.myInfo[0]?.dailyCarrot}
                        </Carrot>
                      </>
                    ) : null}
                  </Member>
                  {groupMemberGet?.participantList?.map((user) => (
                    <Member key={user?.username}>
                      {user?.online ? (
                        <OnlineState>
                          <div />
                          <span>접속중</span>
                        </OnlineState>
                      ) : (
                        <OfflineState>
                          <div />
                          <span>부재중</span>
                        </OfflineState>
                      )}
                      <Link to={PATH.calendar(user?.username)}>
                        <User>
                          <ProfileImg src={user?.profileImage} />
                          <span>{user?.username}</span>
                        </User>
                      </Link>
                      <Carrot>
                        {IMAGES.memberCarrot} {user?.dailyCarrot}
                      </Carrot>
                    </Member>
                  ))}
                </ScrollBox>
                <GroupButton>
                  {groupMemberGet?.isAdmin ? (
                    <>
                      <StGroupBtnLeft>
                        <GroupDetailBtn onClick={clickUpdateHandler}>
                          그룹수정
                        </GroupDetailBtn>
                        <GroupDetailBtn onClick={clickDeleteHandler}>
                          그룹삭제
                        </GroupDetailBtn>
                      </StGroupBtnLeft>
                      <GroupDetailBtn
                        className="reverse"
                        onClick={clickInviteHandler}
                      >
                        그룹원 추가
                      </GroupDetailBtn>
                    </>
                  ) : (
                    <GroupDetailBtn onClick={clickQuitHandler}>
                      그룹탈퇴
                    </GroupDetailBtn>
                  )}
                </GroupButton>
              </>
            ) : null}
          </GroupMemberLayout>
        </GroupSlideModal>
      ) : null}
      {deleteModal ? (
        <GroupModal
          groupName={groupName}
          subject="삭제"
          onClickConfirm={clickDeleteConfirm}
          onClickCancle={clickDeleteCancle}
        />
      ) : null}
      {quitModal ? (
        <GroupModal
          groupName={groupName}
          subject="탈퇴"
          onClickConfirm={clickOutConfirm}
        />
      ) : null}
    </>
  );
};

export default GroupMember;

const GroupMemberLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  h1 {
    font-weight: 700;
    font-size: 1.6rem;
    color: #595550;
    font-family: "Pretendard-Bold";
    cursor: pointer;
  }
  div {
    width: 72px;
    text-align: right;
    color: #4a8a51;
    font-family: "Pretendard-Regular";
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const ScrollBox = styled.div`
  margin-top: 27px;
  width: 260px;
  height: 488px;
  overflow: scroll;
`;

const Member = styled.div`
  height: 47px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;
  justify-content: space-between;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 55px;
  padding-left: 12px;
  div {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #f27808;
  }
  span {
    color: #f27808;
    font-family: "Pretendard-Regular";
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const OnlineState = styled(State)`
  div {
    background-color: #4a8a51;
  }
  span {
    color: #4a8a51;
  }
`;

const OfflineState = styled(State)`
  div {
    background-color: #a4a4a4;
  }
  span {
    color: #a4a4a4;
  }
`;

const User = styled.div`
  width: 116px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  span {
    font-family: "Pretendard-Regular";
    color: #595550;
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

const Carrot = styled(State)`
  font-family: "Pretendard-Bold";
  color: #f27808;
  font-weight: 700;
  font-size: 1.4rem;
  justify-content: flex-end;
`;

const GroupButton = styled.div`
  margin-top: 38px;
  /* margin-top: 24px; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  @media screen and (max-width: 420px) {
    margin-top: 24px;
  }
`;

const StGroupBtnLeft = styled.div`
  display: flex;
  gap: 24px;
`;
