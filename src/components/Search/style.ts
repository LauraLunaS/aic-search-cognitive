import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F1F0F0;
    width: 100%;
    height: 100%;
`;

export const InputText = styled.input `
    background-color: rgba(74, 144, 167, 0.26);
    background-image: url('/searchIcon.png');
    background-repeat: no-repeat;
    background-position: right 5px;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 2rem;
    padding: 1rem;
    margin: 1rem;

    @media (min-width: 450px) {
        width: 50%;
    }

    @media (min-width: 1025px) {
        width: 40%;
    }

    @media (min-width: 1280px) {
        width: 30%;
        height: 2.3rem;
        background-position: right 8px;
    }
`;

export const Form = styled.form `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ContainerResult = styled.div `
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;

export const Result = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    font-family: 'Montserrat';
`;