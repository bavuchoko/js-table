import { JsTable } from '@bavuchoko/js-table';

function App() {

    const header =[
        {key:'checker'},
        {key:'no', },
        {key:'title', label: '제목', style: {width:'180px'}},
        {key:'name', label: '이름', style: {width:'120px'}},
        {key:'createdBy.name', label: '등록자', style: { fontSize: 12}, },
    ]

    const data: any =[
        {id: 1,name:'김길동', title:'test', createdBy:{id:1, name:'강호동'} },
        {id:2, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
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
        {id:19, name:'홍정모', title:'test', createdBy:{id:19, name:'하희라'}},
    ]

    return (
        <div style={{width:'100%', height:'20rem'}}>
            <h1>테스트 페이지awd</h1>
            <JsTable
                page={{
                    size:20,
                    currentPage:0,
                    totalPages:50,
                    totalElements:1000,
                    sort:['name'],
                    desc:'asc'
                }}
                background={'dot'}

                theme={"linear"}
                useSetting={true}
                style={{header:{height:"35px", lineHeight:"35px"},body:{height:"35px"}}}
                usePagination
                onHeaderMove={(v:any) =>{console.log('order:', v)}}
                onHiddenUpdate={(v:any) =>{console.log('hidden:', v)}}
                resizable={true}
                draggable={true}
                onRowClick={(v:any)=>console.log('id:', v)}
                onResizeWidth={(v:any)=>console.log('width:', v)}
                onPageChange={(v:any)=>console.log('page:', v)}
            />
        </div>
    );
}

export default App;