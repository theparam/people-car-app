import { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'

import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Car = props => {
  const styles = getStyles()
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [people, setPeople] = useState(props.people);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false)
  const [cardType, setCardType] = useState(props.cardType || null)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  const getFormattedCurrency = (price) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
    });

    return formatter.format(price);
  }

  const person = people.find(person => person.id === personId);
  const personName = person ? person.firstName + ' ' + person.lastName : '';

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
          people={people}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          type={cardType}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
          style={styles.card}
        > <b>{personName}</b> has {year} {make} {model} which costs <b>{getFormattedCurrency(price)}</b>
        </Card>
      )}
    </div>
  )
}

export default Car
