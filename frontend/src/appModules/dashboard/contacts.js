import React from 'react';
import '../../scss/layoutStyles.scss';

class Contacts extends React.Component {

    render() {
        const { item } = this.props;

        return (
            <table>
                <thead>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Number</th>
                </thead>
                <tbody>
                    {
                        item.length === 0 ?
                            <span className="no-data-found">No Data Found</span> :
                            item.map((item, index) => (
                                <div className="tbody-div">
                                    <tr>
                                        <td>{index + 1}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.Name}</td>
                                    </tr>
                                    <tr>
                                        <td>{item.Number}</td>
                                    </tr>
                                </div>
                            ))
                    }
                </tbody>
            </table>
        );
    }
}

export default Contacts;