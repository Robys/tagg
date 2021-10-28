import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ProgressIcon = (loading) =>{

    return (
    <div>
        
        {loading.isLoading === "true" ? <CircularProgress size={20}/> : 
        loading.isLoading === "false" ? <CheckCircleIcon size="small"/> : "" }
    </div>

    )
}