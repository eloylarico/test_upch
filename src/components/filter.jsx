
import { useState } from 'react';

const Filter = ({handleEvent}) => {
    const [filterKey, setFilterKey] = useState({age:'31', genero:'male'})
    const [showFilter, setShowFilter] = useState(false)
    const handleChange = ({ target: { value, name } }) => {
        setFilterKey({
          ...filterKey,
          [name]: value
        })
      }
      const filter = () => {
        /* Nota: El API No tiene multiples opciones de filtro ahora solo esta funcionando filtro por Edad */
         handleEvent(`users/filter?key=age&value=${filterKey?.age}`)
        }
    return (<>
        <div className="col-sm-12 col-md-6 mt-3 ">
        <div className="d-flex justify-content-end align-items-center">
            <button className="btn btn-sm btn-outline-primary px-4 " id="filtrosBtn" onClick={() => setShowFilter(!showFilter)}>
                <i className="bi bi-sliders"></i> Filtros
            </button>
        </div>

    </div>
    {showFilter && (
        <div className="col-sm-12 mt-4 filtros-content">
        <div className="card border-0 shadow-sm">
          
            <div className="card-body ">
                <div className="row py-3">

                    <div className="form-group  col-sm-12 col-lg-4 ">
                        <div className="input-group ">
                            <select className="form-select form-select-sm single-select select-bs" name="age" onChange={handleChange}>
                                <optgroup label="EDAD">
                                    <option value="28">28</option>
                                    <option value="35">35</option>
                                    <option value="42">42</option>
                                    <option value="45">45</option>
                                    <option value="30">30</option>
                                    <option value="22">22</option>
                                    <option value="38">38</option>
                                    <option value="27">27</option>
                                    <option value="33">33</option>
                                    <option value="31">31</option>
                                    <option value="29">29</option>
                                </optgroup>



                            </select>
                        </div>
                    </div>
                    <div className="form-group  col-sm-12 col-lg-4 ">
                        <div className="input-group ">
                            <select className="form-select form-select-sm single-select select-bs" name="genero" onChange={handleChange}>
                                <optgroup label="GENERO">
                                    <option value="female">FEMALE</option>
                                    <option value="male">MALE</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                        <button className="btn btn-sm btn-primary px-4  btn-search" onClick={filter}>
                            <i className="bi bi-search me-2"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )}
    </>);
}

export default Filter;
