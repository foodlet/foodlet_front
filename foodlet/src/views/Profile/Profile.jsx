import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import ProfilePic from '../../components/ProfilePic/ProfilePic';
import { getMyRecipes } from '../../services/RecipeService';
import Recipe from '../../components/recipes/Recipe/Recipe';
import { getMySaves } from '../../services/SaveService';

const Profile = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext)
  const [myRecipesLoaded, setMyRecipesLoaded] = useState(false)
  const [myRecipes, setMyRecipes] = useState([])
  const [mySaves, setMySaves] = useState([])
  const [mySavesLoaded, setMySavesLoaded] = useState(false)

  useEffect(() => {
    getMyRecipes()
      .then(response => {
        setMyRecipes(response)
        setMyRecipesLoaded(true)
        getMySaves()
          .then(saves => {
            console.log(saves)
            setMySaves(saves)
            setMySavesLoaded(true)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {isAuthLoaded && 
        <div>
          <ProfilePic />
          <h3>@{currentUser.username}</h3>
          {myRecipesLoaded && 
            <div>
              <h4>My recipes</h4>
              {myRecipes.map(myRecipe => {
                return <div>
                  {console.log(myRecipe._id)}
                  <Recipe name={myRecipe.name} description={myRecipe.description} id={myRecipe._id} ingredients={myRecipe.ingredients} time={myRecipe.time} key={myRecipe.id} mine={true}/>
                </div>
              })}
            </div>
          }
          {mySavesLoaded &&
            <div>
              <h4>My saves</h4>
              {mySaves.map(save => {
                console.log(save)
              })}
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Profile;