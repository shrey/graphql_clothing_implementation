import React from 'react';
import {Query,graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import {flowRight} from 'lodash'
import Header from './header.component';


const GET_CART_HIDDEN = gql `
    {
        cartHidden @client
    }
`;
const GET_CURRENT_USER = gql `
    {
        currentUser @client
    }
`

const HeaderContainer = ({currentUserQuery,cartHiddenQuery}) =>{
    const {currentUser} = currentUserQuery
    const {cartHidden} = cartHiddenQuery

    return (
    <Header hidden = {cartHidden} currentUser = {currentUser}/>
      
)}
export default flowRight(
    graphql(GET_CART_HIDDEN,{name: 'cartHiddenQuery'}),
    graphql(GET_CURRENT_USER,{name: 'currentUserQuery'}),
    
)(HeaderContainer);
