import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import ProfilePic from '../../components/ProfilePic/ProfilePic';
import { getExternalRecipesById, getMyRecipes } from '../../services/RecipeService';
import Recipe from '../../components/recipes/Recipe/Recipe';
import { getMySaves } from '../../services/SaveService';
import Save from '../../components/Save/Save';
import './Profile.css'

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
            // console.log('saves ', saves.length)
            // let myPopulatedSaves = []
            // saves.forEach((save, i) => {
            //   if(save.externalRecipe) {
            //     getExternalRecipesById(save.externalRecipe)
            //       .then(externalRecipe => {
            //         // mySaves[i].externalRecipe = externalRecipe[0]
            //         console.log({...saves[i], externalRecipe: externalRecipe[0]})
            //         myPopulatedSaves.push({...saves[i], externalRecipe: externalRecipe[0]})
            //         console.log(myPopulatedSaves)
            //         // myPopulatedSaves.length === saves.length ? myPopulatedSavesLoaded = true : null
            //         if(myPopulatedSaves.length === saves.length) {
            //           setMyPopulatedSavesLoaded(true)
            //           console.log(myPopulatedSavesLoaded)
            //         }
            //       })
            //       .catch(err => console.log(err))
            //   } else {
            //     myPopulatedSaves.push(save)
            //     if(myPopulatedSaves.length === saves.length) {
            //       setMyPopulatedSavesLoaded(true)
            //     }
            //   }
            // })
            // // myPopulatedSaves.length ? setMySaves(myPopulatedSaves) : setMySaves(saves)
            // // myPopulatedSavesLoaded ? setMySaves(myPopulatedSaves) : null
            // console.log(myPopulatedSavesLoaded)
            // if(myPopulatedSavesLoaded) {
            //   console.log('slay', myPopulatedSaves)
            //   setMySaves(myPopulatedSaves)
            //   setMySavesLoaded(true)
            // }
            let promiseArr = []
            let myPopulatedArr = []
            saves.forEach((save) => {
              if(save.externalRecipe) {
                promiseArr.push(getExternalRecipesById(save.externalRecipe))
              } else {
                // setMySaves([...mySaves, value[0]])
                myPopulatedArr.push(save)
              }
            })
            Promise.all(promiseArr)
              .then(values => {
                values.map((value, i) => {
                  setMySaves([...mySaves, value[0]])
                  console.log(value[0])
                  // if(values[i] === values[values.length - 1]){
                  //   setMySavesLoaded(true)
                  // }
                })
                setMySavesLoaded(true)
              })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='app-container'>
      {isAuthLoaded && 
        <div className='Profile'>
          <div className='user-info-profile'>
            <ProfilePic />
            <h3>@{currentUser.username}</h3>
          </div>
          {myRecipesLoaded && 
            <div>
              <h4 className='profile-heading'>My recipes</h4>
              <div className='my-recipes-profile'>
                {myRecipes.map(myRecipe => {
                  return <div>
                    {console.log(myRecipe.image)}
                    <Recipe name={myRecipe.name} description={myRecipe.description} id={myRecipe._id} ingredients={myRecipe.ingredients} time={myRecipe.time} key={myRecipe.id} img={myRecipe.image} mine={true}/>
                  </div>
                })}
              </div>
            </div>
          }
          {mySavesLoaded &&
            <div>
              <h4 className='profile-heading'>My saves</h4>
              <div className='my-saves-profile'>
                {mySaves.map(save => {
                  return <div>
                    {save.name && <div>
                        <Save name={save.name} description={save.description} id={save.id} />
                      </div>
                    }
                    {save.recipe && <div>
                        <Save name={save.recipe.name} description={save.recipe.description} id={save.recipe.id} />
                      </div>
                    }
                  </div>
                })}
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Profile;