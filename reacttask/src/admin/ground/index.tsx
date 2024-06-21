import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Ground(){

    const navigate= useNavigate();

    const getAllData=useQuery({
        queryKey:["GET_ALL_GROUND_DATA"],
        queryFn(){
            return axios.get("http://localhost:8080/ground")
        }
    })

   const deleteApi=useMutation({
       mutationKey:["DELETE_GROUND_BY_ID"],
       mutationFn(id:number){
           return axios.delete("http://localhost:8080/ground/"+id)
       },
       onSuccess(res){
           if(res?.data) {
               alert(res?.data)
           }
           getAllData.refetch();
       },
       onError(res){
           console.log(res)
       }
   })


    return (<>
        <button onClick={()=>navigate("/admin/ground/form")}>Add Ground</button>
       <table>
           <thead>
           <tr>
               <th>Id</th>
               <th>Ground Name</th>
               <th>Action</th>
           </tr>
           </thead>
           <tbody>
           {
               getAllData?.data?.data?.data.map(i=>(

           <tr>
               <td>{i?.id}</td>
               <td>{i?.ground_name}</td>
               <td>
                   <button onClick={()=>navigate("/ground/form/"+i?.id)}>Edit</button> |
                   <button onClick={()=>deleteApi.mutate(i?.id)}>Delete</button>
               </td>
           </tr>
               ))
           }
           </tbody>
       </table>
        </>)
}

export default Ground;