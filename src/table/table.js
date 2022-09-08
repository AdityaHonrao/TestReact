import React from "react";

export default class Table extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        const Url = (this.props.contents==="Students")?"http://localhost:8080/getStudents":"http://localhost:8080/getColleges";
        fetch(Url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (this.props.contents==="Students"){
                return (
                    <table>
                        <caption>Students Table</caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>College</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.college.collegeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            } else{
                return (
                    <table>
                        <caption>Colleges Table</caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>College Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.collegeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            }
        }
    }
}