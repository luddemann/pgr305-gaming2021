import React, { useState } from 'react'
import { 
  Container, 
  Table, 
  Tabs, 
  Tab, 
  Button, 
  ButtonGroup, 
  Image, 
  OverlayTrigger,
  Tooltip,
  Row,
  Col } from 'react-bootstrap'
import InstanceDeleteModal from '../components/InstanceDeleteModal'
import InstanceAddModal from '../components/InstanceAddModal'
import InstanceEditModal from '../components/InstanceEditModal'

const Admin = () => {
  // data for the time being
  const [dummyGames] = useState([
    {
      id: 1,
      image: 'https://www.elkjop.no/primaryimage/193479',
      title: 'Fifa 21',
      genre: 'Sport',
      price: 599,
      console: 'ps5',
    },
    {
      id: 2,
      title: 'Bloodborne',
      image:
        'https://www.elkjop.no/image/dv_web_D180001002318523/PS4HITS6/bloodborne-ps4.jpg?$prod_all4one$',
      genre: 'Fantasy',
      price: 199,
      console: 'ps5',
    },
  ])
  const [dummyCharacters] = useState([
    {
      id: 1,
      name: 'Mario',
      gender: 'M',
      homeWorld: 'Mushroom Kingdom',
      gamesId: [1]
    },
    {
      id: 2,
      name: 'Luigi',
      gender: 'M',
      homeWorld: 'Mushroom Kingdom',
      gamesId: [1, 2]
    },
  ])

  // empty state to store item which is to be edited or deleted
  const [clickedItem, setClickedItem] = useState({})

  // state controlling tabs
  const [key, setKey] = useState('games')

  const findAndSplice = (arr) => {
    const itemIndex = arr.findIndex(item => item.id === clickedItem.id)
    return arr.splice(itemIndex, 1)
  }

  const findAndReplace = (arr, obj) => {
    const itemIndex = arr.findIndex(item => item.id === clickedItem.id)
    return arr.splice(itemIndex, 1, obj)
  }

  const [showEditModal, setShowEditModal] = useState(false)
  const handleEditModalClose = () => setShowEditModal(false)
  const handleEditModalShow = (id) => {

    // set local clickedItem variable
    let clickedItem = null

     // populate clickedItem variable
    if (key === 'games') {
      clickedItem = dummyGames.filter((instance) => instance.id === id)
    } else if (key === 'characters') {
      clickedItem = dummyCharacters.filter((instance) => instance.id === id)
    }

    // set states
    setClickedItem(clickedItem[0])
    setShowEditModal(true)
  }

  const handleEditInstance = (key, item) => {
    console.log(key)
    console.log(item)
    if (key === 'games') {
      findAndReplace(dummyGames, item)
    } else if (key === 'characters') {
      findAndReplace(dummyCharacters, item)
    }
    setShowEditModal(false)
  }

  // delete instance states and handlers
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleDeleteModalClose = () => setShowDeleteModal(false)
  const handleDeleteModalShow = (id) => {
    //save clickedItem in variable

    let clickedItem = null

    if (key === 'games') {
      clickedItem = dummyGames.filter(instance => instance.id === id)
    } else if (key === 'characters') {
      clickedItem = dummyCharacters.filter(instance => instance.id === id)
    }

    // set states
    setClickedItem(clickedItem[0])
    setShowDeleteModal(true)
  }

  const handleDeleteInstance = () => {

    if (key === 'games') {
      findAndSplice(dummyGames)
    } else if (key === 'characters') {
      findAndSplice(dummyCharacters)
    }

    // TODO: handle delete at api endpoint
    setShowDeleteModal(false)
  }

  // add instance state and handlers
  const [showAddModal, setShowAddModal] = useState(false)
  const handleAddModalShow = () => setShowAddModal(true)
  const handleAddModalClose = () => setShowAddModal(false)

  const handleAddInstance = (tabKey, item) => {
    if (tabKey === 'games') {
      // handle new games 
      dummyGames.push(item)
    } else if (tabKey === 'characters') {
      // handle new characters
      dummyCharacters.push(item)
    }

    setShowAddModal(false)
  }
 
  return (
    <div>
      <div className='admin-title-container'>
        <Container>
          <h1>Admin panel</h1>
        </Container>
      </div>
      <div className='admin-overview-container'>
        <Container>
          <Row>
            <Col><h2>Overview</h2></Col>
            <Col className="flex justify-end">
              <Button onClick={() => handleAddModalShow()}>Add new</Button>
            </Col>
          </Row>
          <Tabs
            id='games-overview'
            activeKey={key}
            onSelect={(k) => setKey(k)}
            transition={false}
            variant="tabs"
            className="mt-4"
          >
            <Tab eventKey="games" title="Games">
              <Table className="mt-4" responsive striped bordered>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Console</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyGames.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <OverlayTrigger
                          key={data.id}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-image-${data.id}`}>
                              <Image
                                className="product-image-tooltip"
                                src={data.image}
                                rounded
                              />
                            </Tooltip>
                          }
                        >
                          <Image
                            className='product-image'
                            src={data.image}
                            rounded
                          />
                        </OverlayTrigger>
                      </td>
                      <td>{data.title}</td>
                      <td>{data.genre}</td>
                      <td>{data.price}</td>
                      <td>{data.console}</td>
                      <td>
                        <ButtonGroup>
                          <Button variant="secondary">
                            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          <Button variant="danger" onClick={() => handleDeleteModalShow(data.id)}>
                            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey='characters' title='Characters'>
              <Table className="mt-4" responsive striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Home world</th>
                    <th>Games</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCharacters.map((data) => (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.gender}</td>
                      <td>{data.homeWorld}</td>
                      <td>
                        <ul>
                        {data.gamesId.map(id => (
                          dummyGames.filter(game => game.id === parseInt(id)).map(filteredGame => (
                            <li key={filteredGame.id}>{filteredGame.title}</li>
                          ))
                        ))}
                        </ul>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Button variant="secondary">
                            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          <Button variant="danger" onClick={() => handleDeleteModalShow(data.id)}>
                            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <Button onClick={() => handleEditModalShow(1)}>Show</Button>
        </Container>

        <InstanceDeleteModal
          show={showDeleteModal} 
          onHide={handleDeleteModalClose}
          confirmDelete={handleDeleteInstance}
          title={clickedItem.name !== undefined ? clickedItem.name : clickedItem.title}
        />

        <InstanceAddModal 
          show={showAddModal}
          onHide={handleAddModalClose}
          tab={key}
          submitAdd={handleAddInstance}
          games={dummyGames}
        />
        
        <InstanceEditModal
          show={showEditModal}
          onHide={handleEditModalClose}
          tab={key}
          item={clickedItem}
          submitEdit={handleEditInstance}
          games={dummyGames}
        />
      </div>
    </div>
  )
}

export default Admin