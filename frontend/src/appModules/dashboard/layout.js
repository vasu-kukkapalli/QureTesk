import React from 'react';
import '../../scss/layoutStyles.scss';
import Contacts from './contacts';

class Layout extends React.Component {
    state = {
        data: [
            { "Name": "Sunil Agarwal", "Number": "2177971982" },
            { "Name": "Suresh Agarwal", "Number": "3986617796" },
            { "Name": "Sunder Agarwal", "Number": "7355144765" },
            { "Name": "Sunando Agarwal", "Number": "5979329465" },
            { "Name": "Sunita Agarwal", "Number": "7415662169" },
            { "Name": "Suparna Agarwal", "Number": "4526154715" },
            { "Name": "Suvarna Agarwal", "Number": "1114811521" },
            { "Name": "Sukriti Agarwal", "Number": "4694717862" },
            { "Name": "Sunil Mishra", "Number": "2152781487" },
            { "Name": "Suresh Mishra", "Number": "3746972581" },
            { "Name": "Sunder Mishra", "Number": "1385368899" },
            { "Name": "Sunando Mishra", "Number": "5662847223" },
            { "Name": "Sunita Mishra", "Number": "2351971273" },
            { "Name": "Suparna Mishra", "Number": "6661466374" },
            { "Name": "Suvarna Mishra", "Number": "8915675699" },
            { "Name": "Sukriti Mishra", "Number": "3636353128" },
            { "Name": "Sunil Fernandes", "Number": "5462129593" },
            { "Name": "Suresh Fernandes", "Number": "3967555277" },
            { "Name": "Sunder Fernandes", "Number": "3293494944" },
            { "Name": "Sunando Fernandes", "Number": "6719199812" },
            { "Name": "Sunita Fernandes", "Number": "8154352238" },
            { "Name": "Suparna Fernandes", "Number": "1928733497" },
            { "Name": "Suvarna Fernandes", "Number": "2481752699" },
            { "Name": "Sukriti Fernandes", "Number": "5816414412" },
            { "Name": "Sunil Khan", "Number": "7713243315" },
            { "Name": "Suresh Khan", "Number": "2978526422" },
            { "Name": "Sunder Khan", "Number": "4245562694" },
            { "Name": "Sunando Khan", "Number": "5468249786" },
            { "Name": "Sunita Khan", "Number": "7753337431" },
            { "Name": "Suparna Khan", "Number": "1276169151" },
            { "Name": "Suvarna Khan", "Number": "8135942559" },
            { "Name": "Suresh Mishra", "Number": "6858817966" },
            { "Name": "Sunil Mishra", "Number": "8484537164" },
            { "Name": "Sukriti Agarwal", "Number": "9295421151" },
            { "Name": "Suvarna Agarwal", "Number": "5123724278" },
            { "Name": "Suparna Agarwal", "Number": "6997583139" },
            { "Name": "Sunita Agarwal", "Number": "6842369523" },
            { "Name": "Sunando Agarwal", "Number": "4665196394" },
            { "Name": "Sunder Agarwal", "Number": "4224375815" },
            { "Name": "Suresh Agarwal", "Number": "2773542767" },
            { "Name": "Sunil Agarwal", "Number": "3811621527" },
            { "Name": "Sukriti Singh", "Number": "7722988179" },
            { "Name": "Suvarna Singh", "Number": "8253872667" },
            { "Name": "Suparna Singh", "Number": "8189594227" },
            { "Name": "Sunita Singh", "Number": "1258544119" },
            { "Name": "Sunando Singh", "Number": "8495955314" },
            { "Name": "Sunder Singh", "Number": "4947953175" },
            { "Name": "Suresh Singh", "Number": "8947442479" },
            { "Name": "Sunil Singh", "Number": "8624918641" },
            { "Name": "Sukriti Khan", "Number": "9461636838" },
        ],
        name: [],
        phoneNumber: [],
        filter: "",
        t: [],
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    update = (item) => {
        alert('l');
        this.setState({ t: item })
    }

    render() {
        const { filter, data } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(lowercasedFilter)
            );
        });

        return (
            <div className="mainDiv">
                <div className="profile-div">
                    <div className="profile-sub-div">
                        <span className="user-title">Welcome</span>
                        <span className="user-name">{this.props.username}</span>
                    </div>
                    {/* <span className="logout">Logout</span> */}
                </div>
                <hr className="profile-hr-line" />
                <span className="search-title">Profile Details</span>
                <div className="login-flex-row">
                    <div className="flex-row">
                        <div className="flex-titles">
                            <span className="flex-title">Name&nbsp;:&nbsp;</span>
                            <span className="flex-title">Contact No.&nbsp;:&nbsp;</span>
                        </div>
                        <div className="flex-data">
                            <span className="flex-user-name">{this.props.username}</span>
                            <span className="flex-user-name">9393930393</span>
                        </div>
                    </div>
                    <div>
                        <input
                            placeholder="Search Contacts..."
                            value={filter}
                            onChange={this.handleChange}
                            className="searchbar"
                        />
                    </div>
                </div>
                <div>
                    <Contacts item={filteredData ? filteredData : data} />
                </div>
            </div>
        );
    }
}
export default Layout;