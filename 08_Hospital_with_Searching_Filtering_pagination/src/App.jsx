import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import Petient from './Components/Hospital_Form/Petient';
import Petient_Form from './Components/Hospital_Form/Petient_Form';
import Petient_Edit_Form from './Components/Hospital_Form/Petient_Edit_Form';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

function App() {
  return (
    <Routes>
      <Route path="/" element={<Petient />} />
      <Route path="/petientForm" element={<Petient_Form />} />
      <Route path="/petientEditForm/:id" element={<Petient_Edit_Form />} />
    </Routes>
  );
}

export default App;
