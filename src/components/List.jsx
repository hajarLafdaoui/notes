import axios from 'axios'
import React, { useEffect, useState } from 'react'

const List = () => {
    const [data2, setData2] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const getList = async () => {
        try {
            const token = localStorage.getItem('token');
            const notes = await axios.get("https://notes.devlop.tech/api/notes", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = notes.data;
            console.log(data);
            setData2(data)


        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <h1>My List</h1>

            <table border="1">
                <tr>
                    <th>title</th>
                    <th>content</th>
                </tr>
                {data2.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                    </tr>

                ))}
            </table>



        </div>
    )
}

export default List
