import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'

import { UPDATE_CAR } from '../../queries'

const { Option } = Select;

const UpdateCar = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)

  const [updateContact] = useMutation(UPDATE_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const {
      year,
      make,
      model,
      price,
      personId
    } = values

    updateContact({
      variables: {
        id,
        year: Number(year),
        make,
        model,
        price: Number(price),
        personId
      }
    })

    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
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

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId
      }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <Input placeholder='Ex- 2022' type={"number"} onChange={e => updateStateVariable('year', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input car make!' }]}
      >
        <Input placeholder='Ex- Ford' onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input car model!' }]}
      >
        <Input placeholder='Ex- Ford Eco Sports' onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price!' }]}
      >
        <Input placeholder='Ex-10000' type={"number"} onChange={e => updateStateVariable('price', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please choose the owner!' }]}
      >
        <Select style={{ width: 150 }} onSelect={e => updateStateVariable('personId', e)}>
          {props.people.map(person => (
            <Option key={person.id} value={person.id}>{person.firstName + ' ' + person.lastName}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (
                !form.isFieldTouched('year') &&
                !form.isFieldTouched('make') &&
                !form.isFieldTouched('model') &&
                !form.isFieldTouched('price') &&
                !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
