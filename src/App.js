import './App.css';
import Table from "./table/Table";

function App() {
  return (
        <div className="App">
          <div className="App-header">
            <h1>Litmus Test Student Database</h1>
          </div>
        <div className="App-body">
            <div className="Table-row">
                <Table contents={"Students"}/>
                <Table contents={"Colleges"}/>
            </div>
        </div>
    </div>
  );
}

export default App;
