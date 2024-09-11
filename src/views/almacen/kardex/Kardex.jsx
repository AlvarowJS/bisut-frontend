import React from 'react'
import KardexTable from './KardexTable'

const Kardex = () => {
    return (
        <>
          <h3>Kardex</h3>
            <Row className="mb-2">
                <Col sm="6">
                    <Label className="me-1" for="search-input">
                        Buscar
                    </Label>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        placeholder="buscar por nombre y apellidos"
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm="4"></Col>

                <Col sm="2" className="mt-2">
                
                </Col>
            </Row>
            <ComprasTable
                data={data}
                filter={filter}
                search={search}
                actualizarCompraId={actualizarCompraId}
                eliminarCompra={eliminarCompra}
            />
            <ComprasForm
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
                errors={errors}
                fields={fields}
                append={append}
                remove={remove}
                dataAlmacen={dataAlmacen}
                dataProveedor={dataProveedor}
                dataProductos={dataProductos}
                item={item}
                setItem={setItem}
                setValue={setValue}
                Controller={Controller}
                control={control}
            />
        </>
    )
}

export default Kardex