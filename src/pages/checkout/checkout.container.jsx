import React from 'react';
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import CheckoutPage from './checkout.component';
import {flowRight} from 'lodash'


const GET_CART_ITEMS = gql `
{
    cartItems @client
}
`
const GET_CART_TOTAL = gql `
{
    cartTotal @client
}
`
const CheckoutPageContainer = (props) => {
    console.log(props);
    
    
    const {itemsQuery,totalQuery} = props;
    const {cartItems} = itemsQuery;
    const {cartTotal} = totalQuery;
    return(
    <CheckoutPage cartItems = {cartItems} total = {cartTotal}/>
)}
export default flowRight(
    graphql(GET_CART_ITEMS,{name: 'itemsQuery'}),
    graphql(GET_CART_TOTAL,{name: 'totalQuery'})
    
)(CheckoutPageContainer);