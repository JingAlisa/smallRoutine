import React from 'react';
import './index.less';

export default class JudgeDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const display = this.props.applicant.dialogShow === 'none' ? 'none' : ''
    return (
      <div className="dialogs">
        <div className="js_dialog" id='iosDialog2' style={{ display: display }}>
          <div className="weui-maks"></div>
          <div className="weui-dialog">
            <div className="weui-dialog__bd dialog-context">
              <p>申请者：{ this.props.applicant.uid }</p>
              <p>申请理由：{ this.props.applicant.application.info }</p>
            </div>
            <div className="weui-dialog__ft">
              <a className="weui-dialog__btn weui-dialog__btn_default" 
                 href="javascript:void(0)" 
                 onClick={ this.props.JudgeReject }
              >拒绝</a>
              <a className="weui-dialog__btn weui-dialog__btn_primary" 
                 href="javascript:void(0)" 
                 onClick={ this.props.JudgeAgree }
              >同意</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
