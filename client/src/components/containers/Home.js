import Title from '../layout/Title'
import People from '../lists/People'
import AddPerson from '../forms/AddPerson'
import Cars from '../lists/Cars'
import AddCar from '../forms/AddCar'
import { Divider } from 'antd'
import { GET_PEOPLE } from '../../queries'
import { useQuery } from '@apollo/client'

const Home = (props) => {

    const { loading, error, data } = useQuery(GET_PEOPLE)

    return (
        <>
            <Title />
            <Divider />
            <Title title={"People"} />
            <AddPerson />
            <People />
            <Divider />
            {
                loading ? 'Loading...' : (
                    error ? `Error! ${error.message}` : (
                        (
                            data.people.length > 0 ? <>
                                <Title title={"Cars"} />
                                <AddCar people={data.people} />
                                <Cars people={data.people} />
                            </> : null
                        )
                    )
                )
            }
        </>
    );
}

export default Home