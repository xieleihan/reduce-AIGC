class PubSub {
    constructor() {
        this.events = {};
    }

    // 订阅事件
    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return () => this.unsubscribe(event, callback);
    }

    // 发布事件
    publish(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    // 取消订阅
    unsubscribe(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// 导出一个单例
export const pubsub = new PubSub();