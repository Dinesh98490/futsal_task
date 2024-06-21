import {useForm} from "react-hook-form";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";

function GroundForm() {

    const navigate=useNavigate();


    const {id}=useParams()

    console.log(id);

    const getById= useQuery({
        queryKey:["GET_GROUND_BY_ID"],
        queryFn(){
            return axios.get("http://localhost:8080/ground/"+id)
        }
    })

    console.log(getById?.data?.data)

    const {
        register, handleSubmit,
        formState
    } = useForm({
        values:{...getById?.data?.data,groundName:getById?.data?.data.ground_name},
        mode:"all"
    });


    const {errors} = formState;

    console.log(errors?.groundName?.message);

    const apiCall = useMutation({
        mutationKey: ["SAVE_GROUND_DATA"],
        mutationFn(requestData: any) {
            if(requestData?.id){
                return axios.put("http://localhost:8080/ground", requestData)
            }
            return axios.post("http://localhost:8080/ground", requestData)
        }
    })


    const onSubmit = (values: any) => {
        apiCall.mutate(values,{
            onSuccess(res){
                alert(res?.data?.message)
                navigate("/ground")
            }
        })
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Ground Name</label>
                <input type="text" {...register("groundName", {
                    required: "this is required field"
                })}/>
                <p>{errors?.groundName?.message}</p>


            </div>
            <div>
                <button type="submit">Save </button>
                <button type="button" onClick={()=>navigate("/admin/ground")}>Back</button>
            </div>
        </form>
    </>)
}

export default GroundForm;