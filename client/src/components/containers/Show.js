import { Card } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS } from '../../queries'
import Car from '../listItems/Car'

const getStyles = () => ({
    card: {
        width: '550px'
    }
})

const Show = (props) => {
    const styles = getStyles();

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, { variables: { id } });
    console.log(data)

    return (
        <Card
            actions={[
                <Link
                    to={{ pathname: `/` }}>
                    <div>GO BACK HOME</div>
                </Link>
            ]}
            style={styles.card}
        >
            {
                loading ? 'Loading...' : (
                    error ? `Error! ${error.message}` : (
                        (
                            <>
                                {data.person.firstName} {data.person.lastName}
                                {data.carsByPersonId.map(car => (
                                    <Car
                                        key={car.id}
                                        type="inner"
                                        people={[data.person]}
                                        id={id}
                                        year={car.year}
                                        make={car.make}
                                        model={car.model}
                                        price={car.price}
                                        personId={data.person.id} />
                                )
                                )}

                            </>
                        )
                    )
                )
            }
        </Card>
    );
}

export default Show