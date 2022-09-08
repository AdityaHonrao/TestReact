import './App.css';
import Table from "./table/Table";

function App() {
  return (
        <div className="App">
          <div className="App-header">
            <h1>Litmus Test Student Database</h1>
          </div>
        <div className="App-body">
            <div className="Table-row modal-body row">
                <div className="col-md-6">
                    <Table contents={"Students"}/>
                </div>
                <div className="col-md-6">
                    <Table contents={"Colleges"}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
