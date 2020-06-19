import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Tooltip } from '@material-ui/core';
import Logout from '@material-ui/icons/PowerSettingsNew';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../../scss/layoutStyles.scss';
import { withStyles } from '@material-ui/core/styles';
import { removeToken } from '../../utils/index';
import Layout from './layout';

const styles = theme => ({
    root: {
        width: '100%'
    },
    appBar: {
        background: '#1f2e75'
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Dashboard extends React.Component {

    logout = () => {
        removeToken();
        this.props.history.push('/')
    }

    render() {
        const { classes, theme } = this.props;
        console.log("name value",this.props.location.state && this.props.location.state.detail )
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" >
                            Qure.Ai
                        </Typography>
                        <Typography variant="h6" color="inherit" noWrap className="logout">
                            <Tooltip title="Logout">
                                <Logout onClick={()=> this.logout()}/>
                            </Tooltip>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Layout username={this.props.location.state && this.props.location.state.detail ? this.props.location.state.detail : 'user' } />
                </main>
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(Dashboard);