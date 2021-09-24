import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCard, minusCountFromCard, plusCountFromCard, getTotalCash} from '../../actions';

const CartTable = ({items, deleteFromCard, minusCountFromCard, plusCountFromCard, getTotalCash}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, count} = item;
                        if (count < 1) deleteFromCard(id);
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-count unselectable">
                                    <div onClick={() => {minusCountFromCard(id); getTotalCash();}} className="cart__item-count-button unselectable">-</div>
                                    <div>{count} шт.</div>
                                    <div onClick={() => {plusCountFromCard(id); getTotalCash();}} className="cart__item-count-button unselectable">+</div>
                                </div>
                                <div onClick={() => {deleteFromCard(id); getTotalCash();}} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCard,
    minusCountFromCard,
    plusCountFromCard,
    getTotalCash
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);