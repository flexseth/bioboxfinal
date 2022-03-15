import { useState, useEffect } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps } from '@wordpress/block-editor'

const UserSelector = ( props ) => { 
    //const props = useBlockProps()

    // const {
    //     attributes: {
    //         user,
    //         users
    //     } 
    // } = props;

    const [error, setError] = useState(null);
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    console.log("Props: ", props)

    const handleChangeUser = ( props, newUser ) => {
    alert("Hello from handleChangeUser")

        try {
            props.setAttributes( {user: newUser} );   
        } catch (error) {
            console.log("ERROR: ", error)
        }
        
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect( () => {        
        apiFetch( { path: '/wp/v2/users/me' } )
        .then ( 
            ( user ) => {
                // console.log("isLoaded: ", props.attributes.isLoaded)
                // setIsLoaded(true)
                console.log("Before setUser function: ", user)
                setUser(user)
                console.log("After setUser function: ", user)
                console.log("Display name: ", user.name)
                console.log("Bio: ", user.description)
                console.log("Email: ", user.user_email)
            }, 
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error)
                setIsLoaded(true)
                // props.setAttributes( {isLoaded: true} )
                // setAttributes( {isLoaded: true} )
                console.log("ERROR: ", error    )
            }
        );
    }, [])

    useEffect( (users) => {
            apiFetch( { path: '/wp/v2/users?roles=author,editor,administrator' } )
            .then ( 
                (users) => {
                    setIsLoaded(true)
                    setUsers(users)
                    console.log("Other users", users)
                }, 
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }             
            );
    }, [])
    
  
    if (error) {
    console.log("ERROR: ", error)
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Loading...</div>;
    } 
    
    else {

    console.log("Before render, users:", users)

      return (
            <select
                onChange={ handleChangeUser }>
            {users.map(user => (
                <option 
                    key={user.id}>
                    {user.name} 
                </option>
            ))}
            </select>
        );
    }
      
}

export default UserSelector
