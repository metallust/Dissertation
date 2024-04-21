import React from 'react'

const Body = () => {
    const students = [
        {
            name: "Basit",
            pnr: "1",
            branch: "CSE",
            batch: "2019",
            division: "A",
            roll: "1"
        },
        {
            name: "Irfan",
            pnr: "2",
            branch: "CSE",
            batch: "2019",
            division: "B",
            roll: "3"
        },
        {
            name: "Gaurav",
            pnr: "5",
            branch: "IT",
            batch: "2019",
            division: "A",
            roll: "6"
        }
    ]
    return (
        <div>
            {
                students.map((s) => {
                    return (<div>
                        {s.name}
                    </div>);
                })
            }
        </div>
    )
}

export default Body
