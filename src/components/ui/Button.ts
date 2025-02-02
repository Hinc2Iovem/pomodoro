import styled from "styled-components";

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 15px;

  &:hover {
    opacity: 0.9;
  }

  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }
  margin: 0;
`;

export const AffirmativeButton = styled(Button)`
  background-color: green;

  &:hover {
    box-shadow: 1px 1px 1px 1px green;
  }
`;

export const StopButton = styled(Button)`
  background-color: rgb(222, 17, 17);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(222, 17, 17, 0.9);
  }
`;

export const DangerButton = styled(Button)`
  background-color: rgb(170, 4, 4);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(170, 4, 4, 0.9);
  }
`;

export const ResetButton = styled(Button)`
  background-color: rgb(222, 164, 17);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(222, 164, 17, 0.9);
  }
`;

export const EditButton = styled(Button)`
  background-color: rgb(222, 123, 17);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(222, 123, 17, 0.9);
  }
`;

export const FilterButton = styled(Button)<{ $active?: boolean }>`
  font-size: 20px;
  background-color: ${(props) => (props.$active ? "rgb(17, 130, 222)" : "rgb(17, 106, 222)")};

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(17, 106, 222, 0.9);
  }
`;
