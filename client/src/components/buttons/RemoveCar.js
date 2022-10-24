import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'

import { GET_CARS, REMOVE_CAR } from '../../queries'

const RemoveCar = props => {
  const { id } = props
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS })
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, c => c.id !== removeCar.id)
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Confirm to delete this Car')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveCar
