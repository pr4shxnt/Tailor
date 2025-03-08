import React from 'react'

const upperBody = () => {
  return (
    <div>
        <div className="">
            <div className="form-container">
              <div className="">
                <div className="form-group">
                  <label htmlFor="neck">Neck</label>
                  <input type="number" name="neck" id="neck" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="shoulderWidth">Shoulder Width</label>
                  <input type="number" name="shoulderWidth" id="shoulderWidth" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="chest">Chest</label>
                  <input type="number" name="chest" id="chest" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="upperChest">Upper Chest</label>
                  <input type="number" name="upperChest" id="upperChest" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="waist">Waist</label>
                  <input type="number" name="waist" id="waist" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="hip">Hip</label>
                  <input type="number" name="hip" id="hip" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="armhole">Armhole</label>
                  <input type="number" name="armhole" id="armhole" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="sleeveLength">Sleeve Length</label>
                  <input type="number" name="sleeveLength" id="sleeveLength" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="bicep">Bicep</label>
                  <input type="number" name="bicep" id="bicep" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="elbow">Elbow</label>
                  <input type="number" name="elbow" id="elbow" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="wrist">Wrist</label>
                  <input type="number" name="wrist" id="wrist" className="form-control" />
                  </div>
                <div className="form-group">
                  <label htmlFor="jacketLength">Jacket Length</label>
                  <input type="number" name="jacketLength" id="jacketLength" className="form-control" />
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default upperBody