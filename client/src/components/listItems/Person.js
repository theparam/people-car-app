import { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'

import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import { Link } from 'react-router-dom'
import Show from '../containers/Show'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Person = props => {
  const styles = getStyles()
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <Link
              to={{ pathname: `people/${id}` }}
              element={<Show />}>
              <div>Learn More</div>
            </Link>,
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} />
          ]}
          style={styles.card}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  )
}

export default Person
