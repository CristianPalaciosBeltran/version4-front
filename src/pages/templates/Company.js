import { CompanyIndicators } from '../../components-company'

import { Row } from 'reactstrap'

export const Indicators = ({companyName, companyId, hrefBase}) => {
    return (
        <>
            <h2> {companyName}</h2>
            <Row className="mb-4">
                <CompanyIndicators companyId={companyId} hrefBase={hrefBase}/>
            </Row>
        </>
    )
}