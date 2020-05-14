 import {gql} from 'apollo-boost'

 import {addItemToCart,getCartItemCount,getCartItemsTotal,removeItemFromCart_utils, clearItemFromCart } from './cart.utils.js';

 export const typeDefs = gql `
    extend type User{
        displayName: String!
        id: String!
        email: String!
        createdAt: DateAndTime!
    }
    extend type DateAndTime{
        nanoseconds: Int!
        seconds: Int!
    }
    extend type Item{
         quantity: Int
    }
    extend type Mutation{
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
    }
 `
const GET_CART_HIDDEN = gql `
    {
        cartHidden @client
    }
`
const GET_CART_ITEMS = gql `
{
    cartItems @client
}
`
const GET_ITEM_COUNT = gql `
    {
         itemCount @client
    }
`
const GET_CART_TOTAL = gql `
    {
        cartTotal @client
    }

`
const GET_CURRENT_USER = gql `
    {
        currentUser @client
    }
`
const updateCartItemRelatedQueries = (cache,newCartItems) => {
    cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {cartItems: newCartItems}
    })
    const count = getCartItemCount(newCartItems);
    cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {itemCount: count} 
    })
    const total = getCartItemsTotal(newCartItems);
    cache.writeQuery({
        query: GET_CART_TOTAL,
        data: {cartTotal: total}
    })
}
 export const resolvers = {  
     Mutation: {
         toggleCartHidden: (_root, _args, {cache}) => {
            const {cartHidden}= cache.readQuery({
                query: GET_CART_HIDDEN//we can also add params like we added in collection container by updatating query and adding variables: {}
            })
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {cartHidden: !cartHidden}
            }) 
            return !cartHidden;
         }, 
         addItemToCart:  (_root,{item },{cache}) => {
             const {cartItems} = cache.readQuery({
                 query: GET_CART_ITEMS
             })
             const newCartItems = addItemToCart(cartItems,item);
             updateCartItemRelatedQueries(cache,newCartItems);
             return newCartItems;
             
         },
         removeItemFromCart: (_root,{item}, {cache}) => {
             const {cartItems} = cache.readQuery({
                 query: GET_CART_ITEMS
             })
             const newCartItems = removeItemFromCart_utils(cartItems,item);
             updateCartItemRelatedQueries(cache,newCartItems);
             return newCartItems;
         },
         clearItemFromCart: (_root,{item},{cache}) => {
             const {cartItems} = cache.readQuery({
                 query: GET_CART_ITEMS
             });
             const newCartItems = clearItemFromCart(cartItems,item);
             updateCartItemRelatedQueries(cache,newCartItems);
             return newCartItems;
         },
         setCurrentUser: (_root, {user}, {cache}) =>{
             cache.writeQuery({
                 query: GET_CURRENT_USER,
                 data: {currentUser: user}
             })
         }
     }
 }