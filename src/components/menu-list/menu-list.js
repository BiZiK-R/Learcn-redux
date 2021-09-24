import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCard, getTotalCash} from '../../actions';
import Spinner from "../spinner";
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res))
        .catch(error => this.props.menuError());
    }

    render() {
        const {menuItems, loading, error, addedToCard, getTotalCash} = this.props;
        if (error){
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }
        const items = menuItems.map(menuItem => {
                return (
                    <MenuListItem 
                        key = {menuItem.id} 
                        menuItem = {menuItem}
                        onAddToCard = {() => addedToCard(menuItem.id)}
                        onPlusTotalCash = {() => getTotalCash()}/>
                        
                )
            })

        return (
            <View items = {items}/> 
            )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard,
    getTotalCash
};

const View = ({items}) => {

    return (
        <ul className="menu__list">
            {items}
        </ul>
    ) 
}


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));