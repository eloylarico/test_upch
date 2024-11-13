function itemsRow({data, parentCallback }) {
    const handleChange = (data) => {
        parentCallback(data)
      }
    return (
        <tr>
        <th scope="row"> <input className="form-check-input" type="checkbox" value="" onClick={() =>handleChange(data)}/>
        </th>
        <td>
            <img src={data?.image} alt="" style={{maxWidth:'30px'}}
                className="img-thumbnail "/>
        </td>
        <td>{data?.firstName}</td>
        <td>{data?.gender}</td>
        <td>{data?.address.address}</td>
        <td>{data?.phone}</td>
        <td>{data?.email}</td>
        <td>{data?.age}</td>
    </tr>
  )
}
export default itemsRow;
    