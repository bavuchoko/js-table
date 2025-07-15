import React from 'react';
import './App.css';
import JsTable from "./app/JsTable";

function App() {
    
    const header =[
        {key:'checker', label: '', style: {fontSize: 12}},
        {key:'no', label: 'no.', style: {fontSize: 12}},
        {key:'name', label: '이름', style: {fontSize: 12, width:'200px'}},
        {key:'title', label: '제목', style: {fontSize: 12}},
        {key:'createdBy.name', label: '등록자', style: {fontSize: 12}},
    ]

    const data: any =[
    ]

    return (
        <div className="App">
            <div className={`w-full h-[200px] bg-amber-100`}>test</div>
            <div className={`flex`}>
                <div className={`w-[300px] bg-pink-50`}>aa</div>

                <div className="w-[1200px] h-[500px] ">
                    <JsTable
                        header={header}
                        data={data}
                        page={{
                            size:20,
                            currentPage:0,
                            totalPages:50,
                            totalElements:1000,
                            sort:['name'],
                            desc:'asc'
                        }}
                        theme="dot"
                        usePagination
                        onHeaderMove={v =>{console.log('order:', v)}}
                        resizable={true}
                        draggable={true}
                        onRowClick={v=>console.log('id:', v)}
                        onResizeWidth={v=>console.log('width:', v)}
                        onPageChange={v=>console.log('page:', v)}
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
