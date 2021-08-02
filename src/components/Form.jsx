import React from 'react';
import {useState} from "react";


const Form = () => {
    const url = 'https://jordan.ashton.fashion/api/goods/30/comments';
    const [data, setData] = useState({
        name: "",
        text: ""
    })

    async function submit(e) {
        e.preventDefault();
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        setData({
            name: "",
            text: ""
        });
    }

    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    return (
        <form className="d-flex justify-content-center " onSubmit={(e) => submit(e)}>
            <div className="card w-50 mt-3 bg-dark">
                <div className="card-header d-flex justify-content-center h2 text-white">
                    Add a Comment
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={data.name}
                               onChange={(e) => handle(e)}
                               id="name"
                               placeholder="Your name" required/>
                    </div>
                    <div className="form-group mt-4">
                        <textarea className="form-control"
                              id="text"
                              rows="3"
                              value={data.text}
                              onChange={(e) => handle(e)}
                              placeholder="Add your comment here" required>
                        </textarea>
                    </div>
                    <button type="submit" className="mt-4 btn btn-info text-white">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default Form;