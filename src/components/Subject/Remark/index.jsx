import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt, FaChevronCircleDown } from "react-icons/fa";
import IconSystem from "../../../assets/IconSystem";
import { useSubjectContext } from "../../../hook/useSubjectContent";
import { useRemarkContext } from "../../../hook/useRemarkContent";

import {
  ContainerRemark,
  ContainerCards,
  CardRemark,
  DivDate,
  DivDateReturn,
  DivPhoto,
  DivPhotoII,
  Photo,
  DivDadosRemark,
  NameEmail,
  ContainerComplete,
  NoteText,
  IconOpenClose,
  Circle,
  DivGlobalCard,
  IconTag,
  NoteRemark,
} from "./styles";

const Remark = (props) => {
  const { subject: subjectsList } = useSubjectContext();
  const { remarkEdit } = useRemarkContext();
  const { id } = useSubjectContext();
  const [status, setStatus] = useState();
  const { toggleState, setToggleState } = useSubjectContext();
  const [activeTab, setActiveTab] = useState(0);
  const [activeContent, setActiveContent] = useState(0);
  const [date, setDate] = useState();
  const [dateReturn, setDateReturn] = useState();

  useEffect(() => {
    if (props.title === "More Details Remark") {
      const subject = subjectsList.filter((item) => item.id === props.id)[0];
      setStatus(subject.status);
    }
  }, [id]);

  useEffect(() => {
    if (remarkEdit.date) {
      setDate(remarkEdit.date.split("T")[0]);
      setDateReturn(remarkEdit.date_return.split("T")[0]);
    }
  }, [remarkEdit]);

  const toggleTab = (index) => {
    setToggleState(index);
    setActiveTab(index);
    setActiveContent(index);
  };

  const handleClick = () => {
    setToggleState(1);
  };

  return (
    <ContainerRemark>
      <ContainerCards>
        <CardRemark $mode={status}>
          <DivGlobalCard>
            <DivDate $mode={status}>
              <FaRegCalendarAlt $mode={status} />
              <span> Initial Date</span>

              <p>{date}</p>
            </DivDate>

            <DivDateReturn $mode={status}>
              <FaRegCalendarAlt $mode={status} />
              <span> Final Date</span>
              <p>{dateReturn}</p>
            </DivDateReturn>

            <DivPhoto>
              <DivPhotoII>
                <Photo $mode={status}>{Split(remarkEdit.user_name)}</Photo>
              </DivPhotoII>
            </DivPhoto>

            <DivDadosRemark>
              <NameEmail>
                {SplitName(remarkEdit.user_name)}
                <span>{remarkEdit.user_id}</span>
              </NameEmail>
            </DivDadosRemark>

            {status !== "FINISHED" && status !== "CANCELED" && (
              <IconTag onClick={() => toggleTab(5)}>
                <IconSystem icon={"Edit"} height={"16px"} width={"16px"} />
              </IconTag>
            )}
          </DivGlobalCard>

          <ContainerComplete>
            <NoteRemark>
              Remark title:
              <span>{remarkEdit.remark_name}</span>
            </NoteRemark>
            <NoteText>
              Note Text:
              <span>{remarkEdit.text}</span>
            </NoteText>
          </ContainerComplete>

          <IconOpenClose $mode={status}>
            <Circle>
              <FaChevronCircleDown onClick={() => handleClick()} />
            </Circle>
          </IconOpenClose>
        </CardRemark>
      </ContainerCards>
    </ContainerRemark>
  );
};

export default Remark;

function Split(n) {
  const user = n ? n : "";
  var userSplit = user.split(" ");
  var user2 =
    userSplit[0].split("")[0] +
    " " +
    userSplit[userSplit.length - 1].split("")[0] +
    "";

  return user2.toUpperCase();
}

function SplitName(n) {
  const user = n ? n : "";
  var userSplit = user.split(" ");
  var user1 = userSplit[0] + " " + userSplit[userSplit.length - 1] + "";

  return user1;
}
