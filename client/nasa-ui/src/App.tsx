import { HomePage } from "./template/home/HomePage";
import { BaseLayout } from "./template/common/BaseLayout";
import styled from "styled-components";

function App() {
  return (
    <Base>
      <HomePage key='1' />
    </Base>
  );
}

const Base = styled(BaseLayout)``;

export default App;
