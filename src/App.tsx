import React from 'react';
import './App.css';
import JsTable from "./app/JsTable";

function App() {
    
    const header =[
        {key:'checker'},
        {key:'no', },
        {key:'name', label: '이름', style: {width:'200px'}},
        {key:'title', label: '제목', style: {fontSize: 12}},
        {key:'createdBy.name', label: '등록자', style: { fontSize: 12}, renderer: (data: any) => <p style={{height:'100%', background:'red'}} onClick={()=>alert(data.createdBy.id)}>{data.createdBy.name}</p>},
    ]

    const data: any =[
        {id: 1,name:'김길동', title:'test', createdBy:{id:1, name:'강호동'} },
        {id:2, name:'홍정모', title:'test', createdBy:{id:2, name:'하희w라'}},
        {id:3, name:'김정모', title:'test', createdBy:{id:3, name:'김희라'}},
        {id:4, name:'추정모', title:'test', createdBy:{id:4, name:'유희라'}},
        {id:5, name:'정정모', title:'test', createdBy:{id:5, name:'노희라'}},
        {id:6, name:'문정모', title:'test', createdBy:{id:6, name:'자희라'}},
        {id:7, name:'노정모', title:'test', createdBy:{id:7, name:'최영제'}},
        {id:8, name:'한정모', title:'test', createdBy:{id:8, name:'김영제'}},
        {id:9, name:'장정모', title:'test', createdBy:{id:9, name:'홍영제'}},
        {id:10, name:'홍정모', title:'test', createdBy:{id:10, name:'하희라'}},
        {id:11, name:'홍정모', title:'test', createdBy:{id:11, name:'하희라'}},
        {id:12, name:'홍정모', title:'test', createdBy:{id:12, name:'하희라'}},
        {id:13, name:'홍정모', title:'test', createdBy:{id:13, name:'하희라'}},
        {id:14, name:'홍정모', title:'test', createdBy:{id:14, name:'하희라'}},
        {id:15, name:'홍정모', title:'test', createdBy:{id:15, name:'하희라'}},
        {id:16, name:'홍정모', title:'test', createdBy:{id:16, name:'하희라'}},
        {id:17, name:'홍정모', title:'test', createdBy:{id:17, name:'하희라'}},
        {id:18, name:'홍정모', title:'test', createdBy:{id:18, name:'하희라'}},
        {id:19, name:'홍정모', title:'test', createdBy:{id:12, name:'하희라'}},
        {id:20, name:'홍정모', title:'test', createdBy:{id:13, name:'하희라'}},
        {id:21, name:'홍정모', title:'test', createdBy:{id:14, name:'하희라'}},
        {id:22, name:'홍정모', title:'test', createdBy:{id:15, name:'하희라'}},
        {id:23, name:'홍정모', title:'test', createdBy:{id:16, name:'하희라'}},
        {id:24, name:'홍정모', title:'test', createdBy:{id:17, name:'하희라'}},
        {id:25, name:'홍정모', title:'teawdst', createdBy:{id:18, name:'하희2라'}},
    ]

    return (
        <div className="App">
            <div className={`w-full h-200`}>test</div>
            <div className={`flex`}>
                <div className={`w-300 `}>aa</div>

                <div className="w-1200 h-500 ">
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
                        theme={'dot'}
                        useSetting={true}
                        usePagination
                        onHeaderMove={v =>{console.log('order:', v)}}
                        onHiddenUpdate={v =>{console.log('hidden:', v)}}
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
