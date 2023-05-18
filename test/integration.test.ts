import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('GET http://localhost:3050/api/v1/rack/details/202', () => {
    it('should return rack details of id 202', () => {
        return chai.request('http://localhost:3050')
            .get('/api/v1/rack/details/202')
            .then((res: any) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(202);
            });
    });
});
describe('GET http://localhost:3050/api/v1/rack/rack-unit/', () => {
    it('should return rack unit', () => {
        return chai.request('http://localhost:3050')
            .get('/api/v1/rack/rack-unit/')
            .then((res: any) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               
            });
    });
});

describe('GET http://localhost:3050/api/v1/graph/graph-data/11/', () => {
    it('should return rack unit', () => {
        return chai.request('http://localhost:3050')
            .get('/api/v1/graph/graph-data/11')
            .then((res: any) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql('11');
                res.body.should.have.property('parentId');
                res.body.should.have.property('summary'); 
                res.body.should.have.property('children').be.a('array');
               
            });
    });
});
describe('GET http://localhost:3050/api/v1/graph/about/', () => {
    it('should return rack unit', () => {
        return chai.request('http://localhost:3050')
            .get('/api/v1/graph/about/')
            .then((res: any) => {
                res.should.have.status(200);
                
            });
    });
});
