import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import { listOrders } from './../../../actions/orderAction'

const BarChart = () => {

    const [month, setMonth] = useState([])

    const dispatch = useDispatch()
    let history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    const data = {
        labels: [],
        datasets: [
            {
                label: 'Order List',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [40, 30, 10]
            }
        ]
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <h1 style={{ marginBottom: '20px' }}>Orders</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        // eslint-disable-next-line array-callback-return
                        orders.map(order => {
                            const month = new Date(order.createdAt)
                            data.labels.push(month.toLocaleString('default', { month: 'long' }))
                        }),
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    )
            }
        </Container>
    )
}

export default BarChart
