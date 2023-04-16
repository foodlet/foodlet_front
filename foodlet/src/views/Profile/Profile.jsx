import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import ProfilePic from '../../components/ProfilePic/ProfilePic';
import { getExternalRecipesById, getMyRecipes } from '../../services/RecipeService';
import Recipe from '../../components/recipes/Recipe/Recipe';
import { getMySaves } from '../../services/SaveService';

const Profile = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext)
  const [myRecipesLoaded, setMyRecipesLoaded] = useState(false)
  const [myRecipes, setMyRecipes] = useState([])
  const [mySaves, setMySaves] = useState([])
  const [mySavesLoaded, setMySavesLoaded] = useState(false)
  const [myPopulatedSavesLoaded, setMyPopulatedSavesLoaded] = useState(false)

  useEffect(() => {
    getMyRecipes()
      .then(response => {
        setMyRecipes(response)
        setMyRecipesLoaded(true)
        getMySaves()
          .then(saves => {
            // setMySaves(saves)
            // setMySavesLoaded(true)
            let myPopulatedSaves = []
            saves.forEach((save, i) => {
              if(save.externalRecipe) {
                getExternalRecipesById(save.externalRecipe)
                  .then(externalRecipe => {
                    // mySaves[i].externalRecipe = externalRecipe[0]
                    console.log({...saves[i], externalRecipe: externalRecipe[0]})
                    myPopulatedSaves.push({...saves[i], externalRecipe: externalRecipe[0]})
                    console.log(myPopulatedSaves)
                    // myPopulatedSaves.length === saves.length ? myPopulatedSavesLoaded = true : null
                    if(myPopulatedSaves.length === saves.length) {
                      setMyPopulatedSavesLoaded(true)
                      console.log(myPopulatedSavesLoaded)
                    }
                  })
                  .catch(err => console.log(err))
              } else {
                myPopulatedSaves.push(save)
                if(myPopulatedSaves.length === saves.length) {
                  setMyPopulatedSavesLoaded(true)
                }
              }
            })
            // myPopulatedSaves.length ? setMySaves(myPopulatedSaves) : setMySaves(saves)
            // myPopulatedSavesLoaded ? setMySaves(myPopulatedSaves) : null
            console.log(mySavesLoaded)
            if(myPopulatedSavesLoaded) {
              console.log('slay', myPopulatedSaves)
              setMySaves(myPopulatedSaves)
              setMySavesLoaded(true)
            }
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
          {myPopulatedSavesLoaded &&
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