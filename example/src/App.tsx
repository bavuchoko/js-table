import { JsTable } from '@bavuchoko/js-table';

function App() {

    return (
        <div className={' w-full h-[calc(100vh-12rem)]'}>
            <h1>테스트 페이지</h1>
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
                style={{ header:{height:"35px",}, body:{height:'35px'}}}
                theme={'linear'}
                useSetting={true}
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