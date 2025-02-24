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
import ClientCard from "./CardListView/index";
import AddEditClient from "../AddEditUser";
import ButtonAdd from "../../../../assets/Buttons/ButtonAdd";
import { useState, useEffect } from "react";
import { useClientContext } from "../../../../hook/useClientContent";
import { useUserContext } from "../../../../hook/useUserContext";
import ModalPopUp from "../ModalPopUP";

const abaStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const ContainerCards = () => {
  const { loadUserList, userList } = useUserContext();

  //console.log(userList);
  useEffect(() => {
    loadUserList();
  }, []);

  // States modal//
  const [modal, setModal] = useState(false);

  const [modalPopUp, setModalPopUp] = useState(false);

  const [id, setId] = useState(null);

  const [isEdit, setEdit] = useState(false);

  const [active, setActive] = useState(abaStatus.ACTIVE);

  const handleClick = (selectedTab) => {
    setActive(selectedTab);
  };

  const getTabColor = (status) => {
    return { borderBottom: active === status ? "2px solid #E41165" : "" };
  };

  const createClient = () => {
    setModal(true);
    setEdit(false);
  };

  const EditClient = () => {
    setModal(true);
    setEdit(true);
  };

  return (
    <ContainerGlobal>
      <ContainerHeaderAndCards>
        <HeaderContainerCards>
          <Top>
            <DivTitlePage>
              <H1>User List </H1>
              <HowManyClientList>({userList.length})</HowManyClientList>{" "}
            </DivTitlePage>

            <DivButton onClick={() => createClient()}>
              <ButtonAdd
                mode="#E41165"
                width="169px"
                height="38px"
                name="Create User"
                color="white"
              />
            </DivButton>
          </Top>

          <DivSpans>
            <ButtonActive
              key={abaStatus.ACTIVE}
              onClick={() => handleClick(abaStatus.ACTIVE)}
              style={getTabColor(abaStatus.ACTIVE)}
            >
              <Active>
                Active (
                <HowManyActive>
                  {userList.filter((item) => item.status === "ACTIVE").length}
                </HowManyActive>
                )
              </Active>
            </ButtonActive>
            <ButtonInactive
              key={abaStatus.INACTIVE}
              onClick={() => handleClick(abaStatus.INACTIVE)}
              style={getTabColor(abaStatus.INACTIVE)}
            >
              <Inactive>
                Inactive (
                <HowManyInactive>
                  {userList.filter((item) => item.status === "INACTIVE").length}
                </HowManyInactive>
                )
              </Inactive>
            </ButtonInactive>
          </DivSpans>
        </HeaderContainerCards>

        <CardsContainer>
          <LineDivisor />

          <BoardStyle>
            {userList &&
              userList
                .filter((u) => u.status === active)
                .map((u) => (
                  <ClientCard
                    setId={(i) => setId(i)}
                    openModalPopUp={() => setModalPopUp(true)}
                    key={u.id}
                    id={u.id}
                    openModal={() => EditClient()}
                    //modalPopUp={() => PopUp()}
                  />
                ))}
          </BoardStyle>
        </CardsContainer>
      </ContainerHeaderAndCards>

      <DivModal $mode={modal} />

      {modal && (
        <AddEditClient
          id={id}
          setModal={setModal}
          title={isEdit ? "Edit Client" : "Create Client"}
        />
      )}
      {modalPopUp && (
        <ModalPopUp id={id} modalClose={() => setModalPopUp(false)} />
      )}
    </ContainerGlobal>
  );
};
export default ContainerCards;
