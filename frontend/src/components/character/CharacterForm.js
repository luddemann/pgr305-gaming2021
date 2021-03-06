import React, { useState } from 'react'
import { Form, Image } from 'react-bootstrap'
import axios from 'axios'

const CharacterForm = (props) => {
  const [checkFormValidated, setCheckFormValidated] = useState(false)
  const [characterName, setCharacterName] = useState('')
  const [characterImage, setCharacterImage] = useState('Upload character image')
  const [characterGender, setCharacterGender] = useState('Male')
  const [characterHomeWorld, setCharacterHomeWorld] = useState('')
  const [characterGames, setCharacterGames] = useState('')

  const handleImageChange = () => {
    const image = document.getElementById('id_character_file')

    setCharacterImage(image.files[0].name)
  }

  const handleImageUpload = () => {
    let file = document.getElementById('id_character_file')
    let data = new FormData()

    data.append('file', file.files[0])

    axios.post('https://localhost:5001/characters/uploadimage', data, {headers: {'Content-Type': 'multipart/form-data'}})
  }

  const handleMultipleGamesSelect = (event) => {
    const selected = []
    let selectedOption = (event.target.selectedOptions)

    for (let i = 0; i < selectedOption.length; i++) {
      selected.push(selectedOption.item(i).value)
    }

    setCharacterGames(selected)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    const image = document.getElementById('id_character_file')

    // check if form is invalid
    if (form.checkValidity() === false) {
      // if it is, stop submit and propagation
      event.preventDefault()
      event.stopPropagation()
      setCheckFormValidated(true)

    // if the form is valid
    } else {
      // stop default browser behaviour
      event.preventDefault()
      event.stopPropagation()
      setCheckFormValidated(true)

      let item = {}

      if (props.item !== undefined) {

        // only rerun handleImageUpload if there is a new image
        if (characterImage !== 'Upload character image') {
          handleImageUpload()
        }

        item = {
          id: props.item.id,
          name: characterName !== '' ? characterName : props.item.name,
          image: characterImage !== 'Upload character image' ? `https://localhost:5001/images/characters/${image.files[0].name}` : props.item.image,
          gender: characterGender !== '' ? characterGender : props.item.gender,
          homeWorld: characterHomeWorld !== '' ? characterHomeWorld : props.item.homeWorld,
          gamesId: characterGames !== '' ? characterGames : props.item.gamesId,
        }
      } else {
        handleImageUpload()

        item = {
          name: characterName,
          image: `https://localhost:5001/images/characters/${image.files[0].name}`,
          gender: characterGender,
          homeWorld: characterHomeWorld,
          gamesId: characterGames
        }
      }

      // send item object to parent
      props.submit(item)
    }
  }

  return (
    <Form 
      id="character-form" 
      noValidate 
      validated={checkFormValidated} 
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="id_character_name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue={props.item !== undefined ? props.item.name : null}
          placeholder="Name of character"
          onChange={e => setCharacterName(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">You have to specify a title!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="id_character_file" >
        <Form.Label>Image</Form.Label>
        <Form.File
          required={props.item !== undefined ? false : true}
          label={props.item !== undefined ? props.item.image : characterImage} 
          custom
          onChange={() => handleImageChange()}
        />
        {props.item !== undefined 
          ? <Image 
              className="product-image-tooltip mt-2" 
              src={props.item.image} 
              rounded
            /> 
          : null
        }
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">You have to upload an image!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="id_character_gender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          required
          as="select"
          custom
          defaultValue={props.item !== undefined ? props.item.gender : characterGender}
          onChange={e => setCharacterGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="id_character_home_world" className="mt-3">
        <Form.Label>Home wold</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue={props.item !== undefined ? props.item.homeWorld : null}
          placeholder="World of which the character lives in"
          onChange={e => setCharacterHomeWorld(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">You have to specify a title!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="id_character_games">
        <Form.Label>Games</Form.Label>
        <Form.Control
          required
          as="select"
          multiple
          custom
          defaultValue={props.item !== undefined ? props.item.gamesId : null}
          values={props.games}
          onChange={e => handleMultipleGamesSelect(e)}
        >
          {props.games.map(game => 
            <option key={game.id} value={game.id}>{game.title}</option>
          )}
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

export default CharacterForm