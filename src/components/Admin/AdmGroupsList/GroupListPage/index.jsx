import React from "react";
import {
  ContainerGlobal,
  ContainerHeaderAndCards,
  HeaderContainerCards,
  CardsContainer,
  DivModal,
  LineDivisor,
  BoardStyle,
  DivTitlePage,
  Top,
  H1,
  DivButton,
  DivSpans,
  ButtonInactive,
  ButtonActive,
  HowManyClientList,
  Active,
  HowManyActive,
  Inactive,
  HowManyInactive,
} from "./styles";
import ButtonAdd from "../../../../assets/Buttons/ButtonAdd";
import { useState } from "react";
import { useClientContext } from "../../../../hook/useClientContent";
import ModalPopUp from "../../../Client/ModalPopUP";

// Group
import AddEditGroup from "../../AdmGroupsList/GroupListAddEdit";
import AdmGroupCardListView from "../GroupCardListView/index";
import { useGroupListContext } from "../../../../hook/useGroupListContext";

const abaStatus = {
  ATIVO: "ATIVO",
  INATIVO: "INATIVO",
};

const GroupListView = () => {

  // States modal//

  const [modalPopUp, setModalPopUp] = useState(false);
  const [modal, setModal] = useState(false);

  const [id, setId] = useState(null);
  const [isEdit, setEdit] = useState(false);

  const { group } = useGroupListContext();

 /* const { client } = useClientContext();*/
  
  const [active, setActive] = useState(abaStatus.ATIVO);

  const handleClick = (selectedTab) => {
    setActive(selectedTab);
  };

  const getTabColor = (status) => {
    return { borderBottom: active === status ? "2px solid #E41165" : "" };
  };

  const createGroup = () => {
    setModal(true);
    setEdit(false);
  };

  const EditGroup = () => {
    setModal(true);
    setEdit(true);
  };

  const modalClose = () => {
    setModalPopUp(true);
  };

  return (
    <ContainerGlobal>
      <ContainerHeaderAndCards>
        <HeaderContainerCards>
          <Top>
            <DivTitlePage>
              <H1>Group List </H1>
              <HowManyClientList>({group.length})</HowManyClientList>{" "}
            </DivTitlePage>

            <DivButton onClick={() => createGroup()}>
              <ButtonAdd
                mode="#E41165"
                width="169px"
                height="38px"
                name="Create Group"
                color="white"
              />
            </DivButton>
          </Top>

          <DivSpans>
            <ButtonActive
              key={abaStatus.ATIVO}
              onClick={() => handleClick(abaStatus.ATIVO)}
              style={getTabColor(abaStatus.ATIVO)}
            >
              <Active>
                Active (
                <HowManyActive>
                  {group.filter((item) => item.status === "ATIVO").length}
                </HowManyActive>
                )
              </Active>
            </ButtonActive>
            <ButtonInactive
              key={abaStatus.INATIVO}
              onClick={() => handleClick(abaStatus.INATIVO)}
              style={getTabColor(abaStatus.INATIVO)}
            >
              <Inactive>
                Inactive (
                <HowManyInactive>
                  {group.filter((item) => item.status === "INATIVO").length}
                </HowManyInactive>
                )
              </Inactive>
            </ButtonInactive>
          </DivSpans>
        </HeaderContainerCards>

        <CardsContainer>
          <LineDivisor />

          <BoardStyle>
          {group &&
              group
              .filter((item) => item.status === active)
                .map((item) => (
                  <AdmGroupCardListView
                    setId={(i) => setId(i)}
                    openModalPopUp={() => setModalPopUp(true)}
                    key={item.id}
                    id={item.id}
                    openModal={() => EditGroup()}
                    //modalPopUp={() => PopUp()}
                  />
                ))}
          </BoardStyle>
        </CardsContainer>
      </ContainerHeaderAndCards>

      <DivModal $mode={modal} />

      {modal && (
        <AddEditGroup
          id={id}
          setModal={setModal}
          title={isEdit ? "Edit Group" : "Create Group"}
        />
      )}
      {modalPopUp && (
        <ModalPopUp id={id} modalClose={() => setModalPopUp(false)} />
      )}
    </ContainerGlobal>
  );
};
export default GroupListView;
