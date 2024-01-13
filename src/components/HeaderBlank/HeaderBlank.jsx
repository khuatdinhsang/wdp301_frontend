import HeaderNoSearch from "../component/HeaderNoSearch/HeaderNoSearch"


function HeaderBlank({children}){
    return (
        <div>
            <HeaderNoSearch/>
            <div>
                {children}
            </div>
        </div>
    )
}

export default HeaderBlank