const Loading = () => {
    return (  
        <div className="bg-[rgba(0,0,0,0.5)] fixed h-screen w-screen top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[100px] aspect-square border-[20px] border-white border-t-[20px] border-t-mainBlue rounded-[50%] 
            animate-spin"></div>
        </div>
    );
}
 
export default Loading;